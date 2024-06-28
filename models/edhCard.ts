import {Base} from './base';

interface IConstructor {
  name: string;
  language?: string;
  year?: number;
  yearUnknown?: boolean;
  description?: string;
  acquired?: string;
  imageName?: string;
}

export interface IEdhCard {
  name: string;
  imageName: string;
  language: string;
  year?: number;
  yearUnknown: boolean;
  description?: string;
  acquired?: string;
}

export class EdhCard extends Base {
  name: string;
  imageName: string;
  language: string = 'english';
  year?: number;
  yearUnknown: boolean = false;
  description?: string;
  acquired?: string;

  constructor({
    name,
    language = 'english',
    year,
    yearUnknown = false,
    description,
    acquired,
    imageName,
  }: IConstructor) {
    super();

    this.name = name;
    this.language = language;
    this.imageName =
      imageName ??
      `${name.toLowerCase().replaceAll(' ', '_').replaceAll("'", '').replaceAll(',', '')}.jpg`;
    this.year = year;
    this.yearUnknown = yearUnknown;
    this.description = description;
    this.acquired = acquired;
  }
}
