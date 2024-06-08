import {Base} from './base';

interface IConstructor {
  name: string;
}

export class EdhCard extends Base {
  name: string;
  imageName: string;

  constructor({name}: IConstructor) {
    super();

    this.name = name;
    this.imageName = name.toLowerCase().replaceAll(' ', '_');
  }
}
