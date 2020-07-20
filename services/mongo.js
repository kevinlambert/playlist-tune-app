import mongodb from "mongodb";
import getConfig from "next/config";
import crypto from "crypto";

const {
  serverRuntimeConfig: { mongo },
} = getConfig();

var MongoClient = mongodb.MongoClient;

const COLLECTION_BLOCKED_EMAILS = "blockedEmails";

export const hashValue = (value) => {
  const hashedValue = crypto.createHash("sha256").update(value).digest("hex");
  return hashedValue;
};

export const isEmailBlocked = (emailAddress) => {
  return new Promise((resolve, reject) => {
    const hashedEmailAddress = hashValue(emailAddress);

    MongoClient.connect(mongo.url, function (err, db) {
      if (err) reject(err);
      var dbo = db.db(mongo.databaseName);

      var query = { hashedEmailAddress };

      dbo
        .collection(COLLECTION_BLOCKED_EMAILS)
        .findOne(query, function (err, result) {
          if (err) reject(err);

          resolve({ isBlocked: !!result });
          db.close();
        });
    });
  });
};

export const removeBlockedEmail = (emailAddress) => {
  return new Promise((resolve, reject) => {
    const hashedEmailAddress = hashValue(emailAddress);

    MongoClient.connect(mongo.url, function (err, db) {
      if (err) reject(err);
      var dbo = db.db(mongo.databaseName);

      var query = { hashedEmailAddress };

      dbo
        .collection(COLLECTION_BLOCKED_EMAILS)
        .deleteMany(query, function (err, obj) {
          if (err) reject(err);

          resolve({ success: true, numDocumentsDelete: obj.result.n });

          db.close();
        });
    });
  });
};

// if the collection doesn't exist mongodb will create one for you.
// mongodb will create the DB if it doesn't exit
export const insertBlockedEmail = (emailAddress) => {
  return new Promise((resolve, reject) => {
    const hashedEmailAddress = hashValue(emailAddress);

    isEmailBlocked(emailAddress).then(({ isBlocked }) => {
      if (isBlocked) {
        resolve({ success: true, status: "ALREADY_BLOCKED" });
      } else {
        MongoClient.connect(mongo.url, function (err, db) {
          if (err) reject(err);
          var dbo = db.db(mongo.databaseName);
          var myobj = { hashedEmailAddress };
          dbo
            .collection(COLLECTION_BLOCKED_EMAILS)
            .insertOne(myobj, function (err, res) {
              if (err) reject(err);

              resolve({ success: true });

              db.close();
            });
        });
      }
    });
  });
};
