import MapGenerator from '../utils/map-generator'

const mapGenerator = new MapGenerator(1, self.app.textures)

onmessage = function (e) {
  let message = e.data
  let type = message.type
  
  if(type === 'load_chunks') {
    // mapGenerator.loadChunksInView(message.viewport, (ch) => {
    //   this.postMessage(ch)
    // })
  }

}