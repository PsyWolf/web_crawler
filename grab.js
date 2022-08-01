const grab = flag => {
    if (!flag) return -1;
    const indexOfFlag = process.argv.indexOf(flag);
    return indexOfFlag == -1 ? -1 : process.argv[indexOfFlag + 1];
};

module.exports = grab;