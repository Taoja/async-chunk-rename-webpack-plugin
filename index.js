const AsyncDependenciesBlock = require('webpack/lib/AsyncDependenciesBlock')

class AsyncChunkRename {
  constructor(callback) {
    this.pluginName = 'asyncChunkRename'
    this.callback = callback
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(this.pluginName, compilation => {
      compilation.hooks.succeedModule.tap(this.pluginName, module => {
        module.blocks.forEach(dependency => {
          if (dependency instanceof AsyncDependenciesBlock && !dependency.chunkName) {
            let name = this.callback(dependency)
            dependency.chunkName = name
          }
        })
      })
    })
  }
}

module.exports = AsyncChunkRename