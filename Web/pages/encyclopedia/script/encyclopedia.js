// Done By Rian Ahmed A00437022

// simple function to toggle between the two tables.
function toggleTable() {
  var table = document.getElementById('animalTable');
  var button = document.getElementById('floraButton');

  if (button.innerHTML === "Switch to Flora") {
    // Flora Data
    table.innerHTML = `
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- Flora Data -->
        <tr>
          <td><img src="images/colt'sFoot.jpeg" alt="Colt's-Foot (Tussilago farfara)"></td>
          <td>Colt's-Foot (Tussilago farfara)</td>
          <td>Tussilago farfara, commonly known as coltsfoot, is a plant in the tribe Senecioneae in the family Asteraceae, native to Europe and parts of western and central Asia. The name "tussilago" is derived from the Latin tussis, meaning cough, and ago, meaning to cast or to act on. It has had uses in traditional medicine, but the discovery of toxic pyrrolizidine alkaloids in the plant has resulted in liver health concerns. <br><br> <a href="https://www.inaturalist.org/photos/67955891" rel="noreferrer"> Image by Craig K. Hunt</a></td>
        </tr>
        <tr>
          <td><img src="images/sheepLaurel.jpg" alt="Sheep Laurel (Kalmia angustifolia)"></td>
          <td>Sheep Laurel (Kalmia angustifolia)</td>
          <td>Kalmia angustifolia is a flowering shrub in the family Ericaceae, commonly known as sheep laurel. It is distributed in eastern North America from Ontario and Quebec south to Virginia. It grows commonly in dry habitats in the boreal forest, and may become dominant over large areas after fire or logging. Like many plant species of infertile habitats it has evergreen leaves and mycorrhizal associations with fungi. It is also found in drier areas of peat bogs. <br><br> <a href="https://www.inaturalist.org/photos/44474782" rel="noreferrer"> Image by Brian Hendrix/a></td>
        </tr>
        <tr>
          <td><img src="images/easternTeaberry.jpg" alt="Eastern Teaberry (Gaultheria procumbens)"></td>
          <td>Eastern Teaberry (Gaultheria procumbens)</td>
          <td>Gaultheria procumbens, also called the eastern teaberry, the checkerberry, the boxberry, or the American wintergreen, is a species of Gaultheria native to northeastern North America from Newfoundland west to southeastern Manitoba, and south to Alabama. It is a member of the Ericaceae (heath family). <br><br> <a href="https://www.inaturalist.org/photos/17300" rel="noreferrer"> Image by arghman</a></td>
        </tr>
        <tr>
          <td><img src="images/pinkLady'sSlipper.jpg" alt="Pink Lady's Slipper (Cypripedium acaule)"></td>
          <td>Pink Lady's Slipper (Cypripedium acaule)</td>
          <td>Cypripedium acaule is a species of flowering plant in the orchid family Orchidaceae native to eastern North America. It is the provincial flower of Prince Edward Island, Canada, and the state wildflower of New Hampshire, United States. <br><br> <a href="https://www.inaturalist.org/photos/1532" rel="noreferrer"> Image by liz west</a></td>
        </tr>
        <tr>
          <td><img src="images/redMaple.jpg" alt="Red maple (Acer rubrum)"></td>
          <td>Red maple (Acer rubrum)</td>
          <td>Acer rubrum, the red maple, also known as swamp maple, water maple, or soft maple, is one of the most common and widespread deciduous trees of eastern and central North America. The U.S. Forest Service recognizes it as the most abundant native tree in eastern North America.[4] The red maple ranges from southeastern Manitoba around the Lake of the Woods on the border with Ontario and Minnesota, east to Newfoundland, south to Florida, and southwest to East Texas. Many of its features, especially its leaves, are quite variable in form. At maturity, it often attains a height around 30 m (100 ft). Its flowers, petioles, twigs, and seeds are all red to varying degrees. Among these features, however, it is best known for its brilliant deep scarlet foliage in autumn.  <br><br> <a href="https://www.inaturalist.org/photos/108670006" rel="noreferrer"> Image by Stephen Seiberling</a></td>
        </tr>
        <!-- Add more flora rows as needed -->
      </tbody>
    `;
    button.innerHTML = "Switch to Fauna";
  } else {
    // Fauna Data
    table.innerHTML = `
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- Animal Data -->
        <tr>
        <td><img src="images/songSparrow.jpg" alt="Song Sparrow (Melospiza melodia)"></td>
        <td>Song Sparrow (Melospiza melodia)</td>
        <td>The song sparrow (Melospiza melodia) is a medium-sized New World sparrow. Among the native sparrows in North America, it is easily one of the most abundant, variable and adaptable species. Adult song sparrows have brown upperparts with dark streaks on the back and are white underneath with dark streaking and a dark brown spot in the middle of the breast. They have a brown cap and a long brown rounded tail. Their face is gray with a brown streak through each eye.<br><br><a href="http://commons.wikimedia.org/wiki/File:Melospiza_melodia_JRVdH_01.jpg" rel="noreferrer">Image by Cephas</a></td>
      </tr>
      <tr>
        <td><img src="images/redSquirrel.jpeg" alt="American red squirrel (Tamiasciurus hudsonicus)"></td>
        <td>American red squirrel (Tamiasciurus hudsonicus)</td>
        <td>The American red squirrel (Tamiasciurus hudsonicus) is one of three species of tree squirrels currently classified in the genus Tamiasciurus, known as the pine squirrels (the others are the Douglas squirrel, T. douglasii, and the southwestern red squirrel, T. fremonti). The American red squirrel is variously known as the pine squirrel or piney squirrel, North American red squirrel, chickaree, boomer, or simply red squirrel. <br><br><a href="https://www.inaturalist.org/observations/106185117">Image by Craig K. Hunt</a></td>
      </tr>
      <tr>
        <td><img src="images/asianLadyBeetle.jpg" alt="Asian Lady Beetle (Harmonia axyridis)"></td>
        <td>American red squirrel (Tamiasciurus hudsonicus)</td>
        <td>Harmonia axyridis is a large lady beetle or ladybug species that is most commonly known as the harlequin, Asian, or multicoloured asian lady beetle. This is one of the most variable species in the world, with an exceptionally wide range of colour forms. It is native to eastern Asia, but has been artificially introduced to North America and Europe to control aphids and scale insects. It is now common, well known, and spreading in those regions, and has also established in Africa and widely across South America. This species is conspicuous in North America, where it may locally be known as the Halloween beetle, as it often invades homes during October to overwinter.<br><br><a href="https://www.inaturalist.org/photos/30978499">Image by Paolo Mazzei</a></td>
      </tr>
      <tr>
        <td><img src="images/commonPeriwinkle.jpg" alt="Common Periwinkle (Littorina littorea)"></td>
        <td>Common Periwinkle (Littorina littorea)</td>
        <td>The common periwinkle or winkle (Littorina littorea) is a species of small edible whelk or sea snail, a marine gastropod mollusc that has gills and an operculum, and is classified within the family Littorinidae, the periwinkles. This is a robust intertidal species with a dark and sometimes banded shell. It is native to the rocky shores of the northeastern, and introduced to the northwestern, Atlantic Ocean. <br><br><a href="https://www.inaturalist.org/observations/3505851">Image by Robin Gwen Agarwal</a></td>
      </tr>
      <tr>
        <td><img src="images/rockPigeon.jpg" alt="Rock Pigeon (Columba livia)"></td>
        <td>Rock Pigeon (Columba livia)</td>
        <td>The rock dove, rock pigeon, or common pigeon is a member of the bird family Columbidae. In common usage, it is often simply referred to as the "pigeon". Wild rock doves are pale grey with two black bars on each wing, whereas domestic and feral pigeons vary in colour and pattern. Few differences are seen between males and females. The species is generally monogamous, with two squabs (young) per brood. Both parents care for the young for a time.<br><br><a href="https://www.inaturalist.org/observations/96934693">Image by Константин Самодуров</a></td>
      </tr>
        <!-- Add more animal rows as needed -->
      </tbody>
    `;
    button.innerHTML = "Switch to Flora";
  }
}

// search function for the searchbar
function searchTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("animalTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]; // Index 1 corresponds to the 'Name' column
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
