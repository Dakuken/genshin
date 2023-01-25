import CommonAscencionItems from "./CommonAscencionItems";

export default interface CommonAscencion {
  "slime": CommonAscencionMat
  "handguard": CommonAscencionMat
  "spectral": CommonAscencionMat
  "hilichurl-masks": CommonAscencionMat
  "hilichurl-arrowheads": CommonAscencionMat
  "samachurl-scrolls": CommonAscencionMat
  "treasure-hoarder-insignias": CommonAscencionMat
  "fatui-insignias": CommonAscencionMat
  "nectar": CommonAscencionMat

  "red-cloth" : CommonAscencionMat
  "fungal-spore-powder" : CommonAscencionMat
}


interface CommonAscencionMat {
  characters: string[]
  items: CommonAscencionItems[]
  sources: string[]
}
