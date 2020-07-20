const removeHTML = (dirty) => {
  const regex = /(<([^>]+)>)/gim;
  return dirty.replace(regex, "[HTML Removed]");
};

const removeLinks = (dirty) => {
  const regex = /[a-zA-Z]*[:\/\/]*[A-Za-z0-9\-_]+\.+[A-Za-z0-9\.\/%&=\?\-_]+/gim;
  return dirty.replace(regex, "[Link Removed]");
};

const removeEmails = (dirty) => {
  const regex = /\S*@\S*\s?/gim;
  return dirty.replace(regex, "[Email Removed]");
};

const removeJavascript = (dirty) => {
  const regex = /{([^}]*)}/gim;
  return dirty.replace(regex, "[JavaScript Removed]");
};

export default (dirty) => {
  return removeLinks(removeEmails(removeJavascript(removeHTML(dirty))));
};
