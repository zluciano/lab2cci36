var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias: true}); 
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x220000);
document.body.appendChild( renderer.domElement );

var rows = 5;
var geo= new THREE.Geometry();

for (i=0; i<50; i++)
  for (j=0; j<50; j++)
  {
    geo.vertices.push( new THREE.Vector3(i,j,Math.sin(Math.PI*i/12.5)))
	//geo.colors.push( new THREE.Color(0xff0000) ) 
	geo.colors.push( new THREE.Color( i/50.0, 0.8*j/50.0, 0 ) )
  }
  
for (i=0; i<49; i++)
  for (j=0; j<49; j++)
	{
	  face=new THREE.Face3(i*50+j, i*50+j+1, i*50+j+50)
	  geo.faces.push( face )
	  face.color=new THREE.Color(0xc80000);
	  //face.vertexColors[0]=geo.colors[i*50+j];
	  //face.vertexColors[1]=geo.colors[i*50+j+1];
	  //face.vertexColors[2]=geo.colors[i*50+j+50];
	  
	  face=new THREE.Face3(i*50+j+50+1,  i*50+j+50, i*50+j+1,)
	  //face.vertexColors[0]=geo.colors[i*50+j+50+1];
	  //face.vertexColors[1]=geo.colors[i*50+j+50];
	  //face.vertexColors[2]=geo.colors[i*50+j+1];
	  geo.faces.push( face )
	  face.color=new THREE.Color(0xc80000);

	}

geo.computeFaceNormals()
geo.computeVertexNormals()
	
geo.colorsNeedUpdate=true;
geo.verticesNeedUpdate=true;
geo.dynamic=true;
	
var mesh = new THREE.Mesh( geo, 
  new THREE.MeshPhongMaterial({
     vertexColors: THREE.VertexColors,
	 //flatShading: true,
     side: THREE.DoubleSide,
	 //color:0x00f5f5,
	 }) 
 )
scene.add(mesh)

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

var light =  new THREE.PointLight( 0xffffff, 1.0 );
light.position.set(20,20,10);
scene.add(light)

var amblight = new THREE.AmbientLight(0x444444);
scene.add(amblight)

camera.position.x = -13;
camera.position.z = 15;
camera.position.y = 10;
camera.up = new THREE.Vector3(0,1,0);
camera.lookAt(new THREE.Vector3(0, 0, 0));


light.castShadow = true;
light.position.y = 10;
light.intensity = 2;


function makeBook(bookWidth, bookHeight, bookThick, color) {
    let groupBook = new THREE.Group();

    makeHardcover = function(paperWidth, paperHeight, thick) {
        let
            hardcoverWidth = paperWidth * 1.01,
            hardcoverHeight = paperHeight * 1.01,
            hardcover_geom = new THREE.BoxBufferGeometry(hardcoverWidth, hardcoverHeight, 0.01),
            hardcover_mat = new THREE.MeshLambertMaterial({
                color: color
            }),
            hardcover = new THREE.Mesh(hardcover_geom, hardcover_mat),
            groupHardcover = new THREE.Group();

				hardcover.castShadow = true; //default is false
				hardcover.receiveShadow = true; //default
        let hardcoverBack = hardcover.clone();
        let hardcoverFront = hardcover.clone();
        hardcoverFront.position.z = thick;
        hardcoverBack.position.x = hardcoverHeight / 2;
        hardcoverFront.position.x = hardcoverHeight / 2;
        hardcoverBack.position.y = hardcoverWidth / 2;
        hardcoverFront.position.y = hardcoverWidth / 2;

        let
            thick_aux = thick,
            hardcover_geom_aux = new THREE.BoxBufferGeometry(0.01, paperHeight * 1.01, thick_aux),
            hardcover_mat_aux = new THREE.MeshLambertMaterial({
                color: color
            }),
            hardcover_aux = new THREE.Mesh(hardcover_geom_aux, hardcover_mat_aux);

				hardcover_aux.castShadow = true; //default is false
				hardcover_aux.receiveShadow = true; //default
        hardcover_aux.position.x = 0;
        hardcover_aux.position.y = hardcoverWidth / 2;
        hardcover_aux.position.z = thick_aux / 2;

        groupHardcover.add(hardcoverBack);
        groupHardcover.add(hardcoverFront);
        groupHardcover.add(hardcover_aux)

        return groupHardcover;
    }

    makePages = function(paperWidth, paperHeight, thick) {
        let
            qtyPages = thick / 0.001,
            page_geom = new THREE.BoxBufferGeometry(paperWidth, paperHeight, 0.001),
            page_mat = new THREE.MeshLambertMaterial({
                color: 0xF5F5F5
            }),
        		page = new THREE.Mesh(page_geom, page_mat),
            groupPages = new THREE.Group();

				page.castShadow = true; //default is false
				page.receiveShadow = true; //default

        for (let i = 0; i < qtyPages; i++) {
            let singlePage = page.clone();
            singlePage.position.z = 0.001 * (1 / 2 + i - 1);
            singlePage.position.x = paperWidth / 2;
            singlePage.position.y = paperHeight / 2;
            groupPages.add(singlePage);
        }

        return groupPages;
    }

    let pages = makePages(bookWidth, bookHeight, bookThick);
    let hardcover = makeHardcover(bookWidth * 1.001, bookHeight * 1.001, bookThick);

    groupBook.add(pages);
    groupBook.add(hardcover);

    return groupBook;
}

let makeBookRow = function(qty) {
    let groupBookRow = new THREE.Group();

    let allThick = 0;
    for (let i = 0; i < qty; i++) {
        let bookThick = 0.1 + Math.random() / 3;
        const color = parseInt(Math.random() * 16777215);
        let book = makeBook(1, 1, bookThick, color);
        book.rotation.y = -Math.PI * (i + Math.random()) * 0.01;
        book.position.z = allThick;
        allThick += bookThick + 0.1;

        groupBookRow.add(book);
    }

    return groupBookRow;
}

let makeShelf = function(rows) {
    let
        refY = 0.5,
        baseX = 1.3,
        baseY = 0.15,
        baseZ = 5,
        base_geom = new THREE.BoxBufferGeometry(baseX, baseY, baseZ),
        base_mat = new THREE.MeshLambertMaterial({
            color: 0x654321
        }),
        base = new THREE.Mesh(base_geom, base_mat);

		base.castShadow = true; //default is false
		base.receiveShadow = true; //default

    let
        supportX = 1.3,
        supportY = 0.2 + 1.5 * rows,
        supportZ = 0.1,
        support_geom = new THREE.BoxBufferGeometry(supportX, supportY, supportZ),
        support_mat = new THREE.MeshLambertMaterial({
            color: 0x654321
        }),
        support = new THREE.Mesh(support_geom, support_mat);

		support.castShadow = true; //default is false
		support.receiveShadow = true; //default

    supportLeft = support.clone();
    supportLeft.position.z = -supportZ / 2;
    supportLeft.position.y = supportY / 2;
    supportLeft.position.x = supportX / 2;

    supportRight = support.clone();
    supportRight.position.z = -supportZ / 2 + baseZ;
    supportRight.position.y = supportY / 2;
    supportRight.position.x = supportX / 2;

    let groupBase = new THREE.Group();
    groupBase.add(supportLeft);
    groupBase.add(supportRight);

    for (let i = 0; i < rows; i++) {
        let ith_base = base.clone();
        ith_base.position.y = refY;
        ith_base.position.z = baseZ / 2;
        ith_base.position.x = baseX / 2;

        let BookRow = makeBookRow(10 - parseInt(Math.random() * 3));
        BookRow.position.y = refY + baseY / 2;
        groupBase.add(ith_base);
        groupBase.add(BookRow);

        refY += 1.5;
    }

    return groupBase;
}

shelf = makeShelf(rows);
scene.add(shelf);

planegeom = new THREE.PlaneGeometry(15, 15)
planemat = new THREE.MeshLambertMaterial({
    color: 0xCCCC55
});
plane = new THREE.Mesh(planegeom, planemat);
plane.castShadow = true; //default is false
plane.receiveShadow = true;

plane.rotation.x = -Math.PI / 2.0

plane.position.x = 2
plane.position.z = 2

scene.add(plane)


var controls = new THREE.OrbitControls( camera );

var t=0;

function animate() { 
  requestAnimationFrame( animate ); 
  controls.update()
  //camera.lookAt(new THREE.Vector3(0, 0, 0))
  var axisx = new THREE.Vector3( 1, 0, 0 );
  var axisy = new THREE.Vector3( 0, 1, 0 );
  var axisz = new THREE.Vector3( 0, 0, 1 );
  for (i=0; i<50; i++)
    for (j=0; j<50; j++)
    { a = i/8;
      b = j/10;
      c = (1/2)*(Math.sin(Math.PI*i/12.5+t)+Math.sin(Math.PI*i/12.5-t))/10;
      geo.vertices[i*50+j].set(a,b,c)
      geo.vertices[i*50+j].applyAxisAngle(axisy,-Math.PI/2-Math.PI/10);
      geo.vertices[i*50+j].applyAxisAngle(axisx,Math.PI/2);
      geo.vertices[i*50+j].y += 0.2 + 1.5*rows;
    }
   geo.dynamic=true
   geo.verticesNeedUpdate=true
   

  renderer.render( scene, camera ); 
  t=t+0.5;

} 

animate();