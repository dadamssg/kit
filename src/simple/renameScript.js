let {
  createSourceFilePath,
  createBinFilePath,
  createBinFile,
  updateEnv,
} = await import("./utils.js")

export let renameScript = async (oldName, newName) => {
  //TODO: not finding my `g` git alias
  let result = exec(`type ${newName}`, {
    silent: true,
  })
  if (result.stdout) {
    console.log(`${newName} already exists. 
    ${result.stdout.trim()}
    Please pick a different name...`)
    spawn("simple", ["mv", oldName], { stdio: "inherit" })
    return
  }

  const oldSourcePath = createSourceFilePath(oldName)
  const oldBinPath = createBinFilePath(oldName)
  const newSourcePath = createSourceFilePath(newName)
  rm(oldBinPath)
  mv(oldSourcePath, newSourcePath)
  createBinFile(newName)
  if (oldName == process.env.SIMPLE_NAME) {
    updateEnv("SIMPLE_NAME", newName)
  }
}
