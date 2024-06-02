export class Base {
  toJSON() {
    return Object.fromEntries(Object.entries({...this}).filter(([_, x]) => x !== undefined));
  }
}
