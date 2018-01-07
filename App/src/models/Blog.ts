import{Note} from "./Note"
class Blog {
    public blogger: String;
    public title: String;
    public notes: Array<Note>;
  
    constructor() {
      this.blogger = "";
    }
  }
  export { Blog };