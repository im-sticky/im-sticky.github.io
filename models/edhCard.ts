import {Base} from './base';

interface IConstructor {
  name: string;
  year?: number;
  yearUnknown?: boolean;
  description?: string;
  acquired?: string;
}

export interface IEdhCard {
  name: string;
  imageName: string;
  year?: number;
  yearUnknown: boolean;
  description?: string;
  acquired?: string;
}

export class EdhCard extends Base {
  name: string;
  imageName: string;
  year?: number;
  yearUnknown: boolean = false;
  description?: string;
  acquired?: string;

  constructor({name, year, yearUnknown = false, description, acquired}: IConstructor) {
    super();

    this.name = name;
    this.imageName = `${name.toLowerCase().replaceAll(' ', '_')}.jpg`;
    this.year = year;
    this.yearUnknown = yearUnknown;
    this.description = description;
    this.acquired = acquired;
  }
}
