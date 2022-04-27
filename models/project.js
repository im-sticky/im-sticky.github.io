import {Base} from './base';

export class Project extends Base {
  constructor({title, description, link, external = false, image}) {
    super();

    this.title = title;
    this.description = description;
    this.link = link;
    this.external = external;
    this.image = image;
  }
}
