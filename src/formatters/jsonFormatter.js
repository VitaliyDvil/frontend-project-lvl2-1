import fs from 'fs';

const json = (diffInfo) => fs.writeFileSync('diff.json', JSON.stringify(diffInfo));

export default json;
