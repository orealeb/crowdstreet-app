export class Table {

    constructor(
      public name: string,
      public start: number,
      public increment: number,
      public max: number,
      public width: number,
      public selectedDir: string,
      public directions: [string],
      public data: any [],
    ) {  }
  
  }