var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias: true}); 
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x220000);
document.body.appendChild( renderer.domElement );

geoTopo = new THREE.Geometry();
geoTopo2 = new THREE.Geometry();
geoBottom = new THREE.Geometry();
geoBottom2 = new THREE.Geometry();
geoSidesTopo = new THREE.Geometry();
geoSidesBottom = new THREE.Geometry();

size = 50;
thick = size/25;

for (i=0; i<size; i++)
  for (j=0; j<size; j++)
  {
    geoTopo.vertices.push( new THREE.Vector3(i, j, 0) );
    geoTopo2.vertices.push( new THREE.Vector3(i, j, thick) );
    geoBottom.vertices.push( new THREE.Vector3(i, j, 0) );
    geoBottom2.vertices.push( new THREE.Vector3(i, j, -thick) );
  }
  
  geoSidesTopo.vertices.push( new THREE.Vector3(0, 0, 0) );
  geoSidesTopo.vertices.push( new THREE.Vector3(size-1, 0, 0) );
  geoSidesTopo.vertices.push( new THREE.Vector3(0, size-1, 0) );
  geoSidesTopo.vertices.push( new THREE.Vector3(size-1, size-1, 0) );
  geoSidesTopo.vertices.push( new THREE.Vector3(0, 0, thick) );
  geoSidesTopo.vertices.push( new THREE.Vector3(size-1, 0, thick) );
  geoSidesTopo.vertices.push( new THREE.Vector3(0, size-1, thick) );
  geoSidesTopo.vertices.push( new THREE.Vector3(size-1, size-1, thick) );
  
  geoSidesBottom.vertices.push( new THREE.Vector3(0, 0, 0) );
  geoSidesBottom.vertices.push( new THREE.Vector3(size-1, 0, 0) );
  geoSidesBottom.vertices.push( new THREE.Vector3(0, size-1, 0) );
  geoSidesBottom.vertices.push( new THREE.Vector3(size-1, size-1, 0) );
  geoSidesBottom.vertices.push( new THREE.Vector3(0, 0, -thick) );
  geoSidesBottom.vertices.push( new THREE.Vector3(size-1, 0, -thick) );
  geoSidesBottom.vertices.push( new THREE.Vector3(0, size-1, -thick) );
  geoSidesBottom.vertices.push( new THREE.Vector3(size-1, size-1, -thick) );
  
  face = new THREE.Face3(0,1,4);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )
  face = new THREE.Face3(4,1,5);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )
  face = new THREE.Face3(0,6,2);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )
  face = new THREE.Face3(6,0,4);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )
  face = new THREE.Face3(2,6,7);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )
  face = new THREE.Face3(2,7,3);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )
  face = new THREE.Face3(1,3,5);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )
  face = new THREE.Face3(3,7,5);
  face.color=new THREE.Color(0xffffff);
  geoSidesTopo.faces.push( face )

  face = new THREE.Face3(0,4,1);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )
  face = new THREE.Face3(4,5,1);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )
  face = new THREE.Face3(0,2,6);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )
  face = new THREE.Face3(6,4,0);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )
  face = new THREE.Face3(2,7,6);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )
  face = new THREE.Face3(2,3,7);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )
  face = new THREE.Face3(1,5,3);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )
  face = new THREE.Face3(3,5,7);
  face.color=new THREE.Color(0xffffff);
  geoSidesBottom.faces.push( face )


for (i=0; i<size-1; i++)
  for (j=0; j<size-1; j++)
	{
	  face=new THREE.Face3(i*size+j, i*size+j+1, i*size+j+size)
    face.color=new THREE.Color(0xffffff);
    geoTopo.faces.push( face )
    geoTopo2.faces.push( face )
    geoBottom.faces.push( face )
    geoBottom2.faces.push( face )
	  
	  face=new THREE.Face3(i*size+j+size+1,  i*size+j+size, i*size+j+1,)
    face.color=new THREE.Color(0xffffff);
    geoTopo.faces.push( face )
    geoTopo2.faces.push( face )
    geoBottom.faces.push( face )
    geoBottom2.faces.push( face )
  }
  
geoTopo.computeBoundingBox();

var max = geoTopo.boundingBox.max,
    min = geoTopo.boundingBox.min;
var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
var faces = geoTopo.faces;

geoTopo.faceVertexUvs[0] = [];

for (var i = 0; i < faces.length ; i++) {

    var v1 = geoTopo.vertices[faces[i].a], 
        v2 = geoTopo.vertices[faces[i].b], 
        v3 = geoTopo.vertices[faces[i].c];

    geoTopo.faceVertexUvs[0].push([
        new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
        new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
        new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y)
    ]);
}
geoTopo.uvsNeedUpdate = true;

geoBottom.computeBoundingBox();

var max = geoBottom.boundingBox.max,
    min = geoBottom.boundingBox.min;
var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
var faces = geoBottom.faces;

geoBottom.faceVertexUvs[0] = [];

for (var i = 0; i < faces.length ; i++) {

    var v1 = geoBottom.vertices[faces[i].a], 
        v2 = geoBottom.vertices[faces[i].b], 
        v3 = geoBottom.vertices[faces[i].c];

    geoBottom.faceVertexUvs[0].push([
        new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
        new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
        new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y)
    ]);
}
geoBottom.uvsNeedUpdate = true;

geoTopo2.computeBoundingBox();

var max = geoTopo2.boundingBox.max,
    min = geoTopo2.boundingBox.min;
var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
var faces = geoTopo2.faces;

geoTopo2.faceVertexUvs[0] = [];

for (var i = 0; i < faces.length ; i++) {

    var v1 = geoTopo2.vertices[faces[i].a], 
        v2 = geoTopo2.vertices[faces[i].b], 
        v3 = geoTopo2.vertices[faces[i].c];

    geoTopo2.faceVertexUvs[0].push([
        new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
        new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
        new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y)
    ]);
}
geoTopo2.uvsNeedUpdate = true;

  geoTopo.computeFaceNormals()
  geoTopo.computeVertexNormals()
  geoTopo2.computeFaceNormals()
  geoTopo2.computeVertexNormals()
  geoBottom.computeFaceNormals()
  geoBottom.computeVertexNormals()
  geoBottom2.computeFaceNormals()
  geoBottom2.computeVertexNormals()
  geoSidesTopo.computeFaceNormals()
  geoSidesTopo.computeVertexNormals()
  geoSidesBottom.computeFaceNormals()
  geoSidesBottom.computeVertexNormals()
      
  geoTopo.colorsNeedUpdate=true;
  geoTopo.verticesNeedUpdate=true;
  geoTopo.dynamic=true;
  geoTopo2.colorsNeedUpdate=true;
  geoTopo2.verticesNeedUpdate=true;
  geoTopo2.dynamic=true;
  geoSidesTopo.colorsNeedUpdate=true;
  geoSidesTopo.verticesNeedUpdate=true;
  geoSidesTopo.dynamic=true;
  geoBottom.colorsNeedUpdate=true;
  geoBottom.verticesNeedUpdate=true;
  geoBottom.dynamic=true;

  var textureLoaderkey = new THREE.TextureLoader();
  var texturekey = textureLoaderkey.load( "keyboard.png" );
  var textureLoaderscreen1 = new THREE.TextureLoader();
  var textureforster1 = textureLoaderscreen1.load( "screen21.png" );
  var textureLoaderscreen2 = new THREE.TextureLoader();
  var textureforster2 = textureLoaderscreen2.load( "screen22.png" );
  var textureLoaderbanana = new THREE.TextureLoader();
  var texturebanana = textureLoaderbanana.load( "banana.png" );

  var meshc1 = new THREE.Mesh( geoTopo, 
    new THREE.MeshPhongMaterial({
       vertexColors: THREE.VertexColors,
     //flatShading: true,
       side: THREE.DoubleSide,
       map: textureforster1,
     }) 
   )
  scene.add(meshc1)

  var meshc2 = new THREE.Mesh( geoTopo, 
    new THREE.MeshPhongMaterial({
       vertexColors: THREE.VertexColors,
     //flatShading: true,
       side: THREE.DoubleSide,
       map: textureforster2,
     }) 
   )

  var mesh = new THREE.Mesh( geoTopo2, 
    new THREE.MeshPhongMaterial({
       vertexColors: THREE.VertexColors,
     //flatShading: true,
       side: THREE.DoubleSide,
       map: texturebanana,
     }) 
   )
  scene.add(mesh)

  var mesh = new THREE.Mesh( geoBottom, 
    new THREE.MeshPhongMaterial({
       vertexColors: THREE.VertexColors,
     //flatShading: true,
       side: THREE.DoubleSide=true,
       map: texturekey,
     }) 
   )
  scene.add(mesh)

  var mesh = new THREE.Mesh( geoBottom2, 
    new THREE.MeshPhongMaterial({
       vertexColors: THREE.VertexColors,
     //flatShading: true,
       side: THREE.DoubleSide,
     }) 
   )
  scene.add(mesh)

  var mesh = new THREE.Mesh( geoSidesTopo, 
    new THREE.MeshPhongMaterial({
       vertexColors: THREE.VertexColors,
     //flatShading: true,
       side: THREE.DoubleSide,
     }) 
   )
  scene.add(mesh)

  var mesh = new THREE.Mesh( geoSidesBottom, 
    new THREE.MeshPhongMaterial({
       vertexColors: THREE.VertexColors,
     //flatShading: true,
       side: THREE.DoubleSide,
     }) 
   )
  scene.add(mesh)

  var axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
  
  var axisx = new THREE.Vector3( 1, 0, 0 );
  var axisy = new THREE.Vector3( 0, 1, 0 );
  var axisz = new THREE.Vector3( 0, 0, 1 );

  for (i=0; i<size; i++)
     for (j=0; j<size; j++)
     {
      geoBottom.vertices[size*i+j].applyAxisAngle(axisx,Math.PI)
      geoBottom.vertices[size*i+j].y += size-1;
      geoTopo2.vertices[size*i+j].z -= thick;
      geoTopo2.vertices[size*i+j].applyAxisAngle(axisx,Math.PI)
      geoTopo2.vertices[size*i+j].y += size-1;
      geoTopo2.vertices[size*i+j].z += thick;
     }

  var light =  new THREE.PointLight( 0xffffff, 1.0 );
  //light.position={ x: 2, y:1, z: 3};
  light.position.set(14,2,-5);

  scene.add(light)
  camera.position.x = 100;
  camera.position.z = 50;
  camera.position.y = 20;
  camera.up = new THREE.Vector3(0,0,1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  var controls = new THREE.OrbitControls( camera );
  
  
  var t=0;
  var s=0;
  var time = 0;
  var angle = 0;
  var estado=1;
  var open = true;

function animate() { 
  requestAnimationFrame( animate ); 
  controls.update()
  //camera.lookAt(new THREE.Vector3(0, 0, 0))
  angle = t*Math.PI/180;
  if(angle<=Math.PI/2 && open) {  
    for (i=0; i<size; i++)
      for(j=0; j<size; j++)
      {
        geoTopo.vertices[size*i+j].applyAxisAngle(axisy,-Math.PI/180)
        geoTopo2.vertices[size*i+j].applyAxisAngle(axisy,-Math.PI/180)
      }
      for (i=0; i<8; i++)
      {
        geoSidesTopo.vertices[i].applyAxisAngle(axisy,-Math.PI/180)
      }
    t = t+1;
  }
  else if(angle>=0 && !open)
  {
    for (i=0; i<size; i++)
      for(j=0; j<size; j++)
      {
        geoTopo.vertices[size*i+j].applyAxisAngle(axisy,Math.PI/180)
        geoTopo2.vertices[size*i+j].applyAxisAngle(axisy,Math.PI/180)
      }
      for (i=0; i<8; i++)
      {
        geoSidesTopo.vertices[i].applyAxisAngle(axisy,Math.PI/180)
      }
    t = t-1;
  }

  if(time >= 180 && open)
  {
    open = false;
    time = 0;
  }
  else if(time >= 180 && !open)
  {
    open = true;
    time = 0;
  }

    if(s>5 && estado==2)
    { 
      scene.remove(meshc2)
      scene.add(meshc1)
      estado=1;
      s=0;
    }
    else if(s>5 && estado==1)
    {
      scene.remove(meshc1)
      scene.add(meshc2)
      estado=2;
      s=0;
    }

    geoTopo.dynamic=true
    geoTopo.verticesNeedUpdate=true
    geoTopo2.dynamic=true
    geoTopo2.verticesNeedUpdate=true
    geoSidesTopo.dynamic=true
    geoSidesTopo.verticesNeedUpdate=true
   

  renderer.render( scene, camera ); 
  time=time+1;
  s=s+1;

} 

animate();
