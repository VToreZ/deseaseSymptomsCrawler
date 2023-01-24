import { append, write } from "@/io/saveFile.js"

export class Logger
{
  fileName: string
  constructor(fileName: string)
  {
    this.fileName = fileName
    write(this.fileName, '')
  }
  
  appendError(errNote: string) {
    append(this.fileName, errNote)
  }
}
