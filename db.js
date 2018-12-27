function find(id) {
  if (id > 10) {
    return null;
  }

  return { id }
}

module.exports = { find }
