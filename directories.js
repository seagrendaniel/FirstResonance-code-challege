class Directory {
  constructor(title, subDirectory) {
    this.title = title
    this.subDirectory = []
  }

  printCommand(command) {
    console.log(command)
  }

  run(command) {
    // takes input string and returns desired result
    this.printCommand(command)
    let commandArray = command.split(' ')
    let commandAction = command.split(' ')[0]
    let commandObj = command.split(' ')[1]
    let commandTarget = command.split(' ')[2]
    if (commandArray.length < 2) {
      this.list(this)
    } else if (commandAction === "CREATE") {
      this.create(commandObj)
    } else if(commandAction === "MOVE") {
      this.move(commandObj, commandTarget)
    } else if(commandAction === "DELETE") {
      this.delete(commandObj)
    }
  }

  create(folder) {
    this.subDirectory = this.subDirectory.filter(folder => folder)
    const folderArr = folder.split(/\//)
    const newFolder = new Directory(folderArr[folderArr.length - 1])
    let dirTitles = []
    
    if(this.subDirectory.length) {
      const objTitlesBefore = Object.values(this.subDirectory)
      dirTitles = objTitlesBefore.map(title => title.title)

      // check if outer part of folderArr exists in this.subDirectory
      for(let x = 0; x < this.subDirectory.length; x++) {
        if (this.subDirectory[x].title === folderArr[0]) {
          if(!this.subDirectory[x].subDirectory.length) {
            this.subDirectory[x].subDirectory.push(newFolder)
            break
          } else {
            for(let y = 0; y < this.subDirectory[x].subDirectory.length; y++) {
              if(!this.subDirectory[x].subDirectory[y].subDirectory.length || this.subDirectory[x].subDirectory[y].title == folderArr[1]) {
                this.subDirectory[x].subDirectory[y].subDirectory.push(newFolder)
                break
              } 
            }
          }
          break
        } else if (!dirTitles.includes(newFolder.title) && !dirTitles.includes(folderArr[0])) {
          this.subDirectory.push(newFolder)
          break
        }
      }
    } else this.subDirectory.push(newFolder)
  }

  move(folder, targetFolder) {
    const folderArr = folder.split(/\//)
    const folderToMoveName = folderArr[folderArr.length - 1]
    let folderToMove

    // pull folderToMove out of directory
    for(let x = 0; x < this.subDirectory.length; x++) {
      let currentSubDir = this.subDirectory[x]
      if(currentSubDir.title === folderArr[0]) {
        if(currentSubDir.subDirectory.length > 0 && folderArr.length > 1) {
          for(let y = 0; y < currentSubDir.subDirectory.length; y++) {
            if(currentSubDir.subDirectory[y].title === folderToMoveName) {
              folderToMove = currentSubDir.subDirectory.pop()
              if(currentSubDir.subDirectory.length > 0) {
                currentSubDir.subDirectory.splice(y, 1)
              }
            }
          }
        } else {
          folderToMove = currentSubDir
          this.subDirectory.splice(x, 1)
        }
      } 
    }

    // push folderToMove into new directory
    for(let x = 0; x < this.subDirectory.length; x++) {
      let currentSubDir = this.subDirectory[x]
      if(currentSubDir.title === targetFolder) {
        currentSubDir.subDirectory.push(folderToMove)
      }
    }    
  }

  delete(folder){
    const folderArr = folder.split(/\//)
    const folderToDeleteName = folderArr[folderArr.length - 1]

    for(let x = 0; x < this.subDirectory.length; x++) {
      let currentSubDir = this.subDirectory[x]
      if(currentSubDir.title === folderArr[0]) {
        if(currentSubDir.subDirectory.length && folderArr.length > 1) {

          for(let y = 0; y < currentSubDir.subDirectory.length; y++) {
            let currentSubSubDir = currentSubDir.subDirectory[y]
            if(currentSubSubDir.title === folderArr[1]) {
              if(currentSubSubDir.subDirectory.length && folderArr.length > 2) {

                for(let z = 0; z < currentSubSubDir.subDirectory.length; z++) {
                  let currentSub3Dir = currentSubSubDir.subDirectory[z]
                  if(currentSub3Dir.title === folderToDeleteName) {
                    currentSubSubDir.subDirectory.splice(z, 1)
                  }
                }
              }
            } else {
              continue
            }
          }
        } else {
          this.subDirectory.splice(x, 1)
        }
      } else {
        console.log(`Cannot delete ${folder} - ${folderArr[0]} does not exist`)
        return
      }
    }

  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


  list(directory) {
    const spaces = "  "

    let sortedDir = Object.values(directory.subDirectory).sort(this.dynamicSort("title"))
    if (sortedDir.length === 1) {
      let subDir = sortedDir[0].subDirectory
      let sortedSubDir = Object.values(subDir).sort(this.dynamicSort("title"))
      sortedDir[0].subDirectory = sortedSubDir
    }

    sortedDir.forEach((item, idx) => {
      console.log(item.title)
      if(item.subDirectory) {
        item.subDirectory.forEach((subItem) => {
          console.log(`${spaces.repeat(idx + 1)}${subItem.title}`)
          if(subItem.subDirectory) {
            subItem.subDirectory.forEach((subSubItem) => {
              console.log(`${spaces.repeat(idx + 2)}${subSubItem.title}`)
            })
          }
        })
      }
    })
  }
}

const dirs = new Directory("")
dirs.run('CREATE fruits')
dirs.run('CREATE vegetables')
dirs.run('CREATE grains')
dirs.run('CREATE fruits/apples')
dirs.run('CREATE fruits/apples/fuji')
dirs.run('LIST')
dirs.run('CREATE grains/squash')
dirs.run('MOVE grains/squash vegetables')
dirs.run('CREATE foods')
dirs.run('MOVE grains foods')
dirs.run('MOVE fruits foods')
dirs.run('MOVE vegetables foods')
dirs.run('LIST')
dirs.run('DELETE fruits/apples')
dirs.run('DELETE foods/fruits/apples')
dirs.run('LIST')