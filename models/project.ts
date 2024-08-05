import {Base} from './base';

interface IConstructor {
  title: string;
  description: string;
  link: string;
  external?: boolean;
  image?: string;
}

export class Project extends Base {
  title: string;
  description: string;
  link: string;
  external: boolean;
  image?: string;

  constructor({title, description, link, external = false, image}: IConstructor) {
    super();

    this.title = title;
    this.description = description;
    this.link = link;
    this.external = external;
    this.image = image;
  }
}
