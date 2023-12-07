/*
  File: ecosystem.js

  Description: This file contains javascript code for the ecosystem.html
  file for the ecosystem encyclopedia webpage. This file uses a table
  and button variables to create the two separate tables and allow
  seamless switching along with the ability to search the table
  by only the name column of the table and nothing else.

  Author: Rian Ahmed A00437022
  Commenting: Rian Ahmed A00437022
  Testing: Rian Ahmed A00437022
  Date: November/December 2023
*/

/**
 * Toggle between displaying Flora and Fauna data in a table.
 * If the current display is Flora, switch to Fauna, and vice versa.
 * Also, update the button label accordingly.
 * 
 * @function toggleTable
 * @memberof window
 * @global
 */
function toggleTable() {
  // Get references to the table and button elements
  let table = document.getElementById('animalTable');
  let button = document.getElementById('floraButton');

  // Check the current state of the button's label
  if (button.innerHTML === "Switch to Flora") {
    // Switch to displaying Flora data and update the button label
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
          <td><img src="../../resources/image/flora/colt'sFoot.jpeg" alt="Colt's-Foot (Tussilago farfara)"></td>
          <td>Colt's-Foot (Tussilago farfara)</td>
          <td>Tussilago farfara, commonly known as coltsfoot, is a plant in the tribe Senecioneae in the family Asteraceae, native to Europe and parts of western and central Asia. The name "tussilago" is derived from the Latin tussis, meaning cough, and ago, meaning to cast or to act on. It has had uses in traditional medicine, but the discovery of toxic pyrrolizidine alkaloids in the plant has resulted in liver health concerns. <br><br> <a href="https://www.inaturalist.org/photos/67955891" rel="noreferrer"> Image by Craig K. Hunt</a> <br><br><a href="https://en.wikipedia.org/wiki/Tussilago" rel="noreferrer">Read More</a></td>
        </tr>
        <tr>
          <td><img src="../../resources/image/flora/sheepLaurel.jpg" alt="Sheep Laurel (Kalmia angustifolia)"></td>
          <td>Sheep Laurel (Kalmia angustifolia)</td>
          <td>Kalmia angustifolia is a flowering shrub in the family Ericaceae, commonly known as sheep laurel. It is distributed in eastern North America from Ontario and Quebec south to Virginia. It grows commonly in dry habitats in the boreal forest, and may become dominant over large areas after fire or logging. Like many plant species of infertile habitats it has evergreen leaves and mycorrhizal associations with fungi. It is also found in drier areas of peat bogs. <br><br> <a href="https://www.inaturalist.org/photos/44474782" rel="noreferrer"> Image by Brian Hendrix</a> <br><br><a href="https://en.wikipedia.org/wiki/Kalmia_angustifolia" rel="noreferrer">Read More</a></td>
        </tr>
        <tr>
          <td><img src="../../resources/image/flora/easternTeaberry.jpg" alt="Eastern Teaberry (Gaultheria procumbens)"></td>
          <td>Eastern Teaberry (Gaultheria procumbens)</td>
          <td>Gaultheria procumbens, also called the eastern teaberry, the checkerberry, the boxberry, or the American wintergreen, is a species of Gaultheria native to northeastern North America from Newfoundland west to southeastern Manitoba, and south to Alabama. It is a member of the Ericaceae (heath family). <br><br> <a href="https://www.inaturalist.org/photos/17300" rel="noreferrer"> Image by arghman</a> <br><br><a href="https://en.wikipedia.org/wiki/Gaultheria_procumbens" rel="noreferrer">Read More</a></td>
        </tr>
        <tr>
          <td><img src="../../resources/image/flora/pinkLady'sSlipper.jpg" alt="Pink Lady's Slipper (Cypripedium acaule)"></td>
          <td>Pink Lady's Slipper (Cypripedium acaule)</td>
          <td>Cypripedium acaule is a species of flowering plant in the orchid family Orchidaceae native to eastern North America. It is the provincial flower of Prince Edward Island, Canada, and the state wildflower of New Hampshire, United States. <br><br> <a href="https://www.inaturalist.org/photos/1532" rel="noreferrer"> Image by liz west</a> <br><br><a href="https://en.wikipedia.org/wiki/Cypripedium_acaule" rel="noreferrer">Read More</a></td>
        </tr>
        <tr>
          <td><img src="../../resources/image/flora/redMaple.jpg" alt="Red maple (Acer rubrum)"></td>
          <td>Red maple (Acer rubrum)</td>
          <td>Acer rubrum, the red maple, also known as swamp maple, water maple, or soft maple, is one of the most common and widespread deciduous trees of eastern and central North America. The U.S. Forest Service recognizes it as the most abundant native tree in eastern North America.[4] The red maple ranges from southeastern Manitoba around the Lake of the Woods on the border with Ontario and Minnesota, east to Newfoundland, south to Florida, and southwest to East Texas. Many of its features, especially its leaves, are quite variable in form. At maturity, it often attains a height around 30 m (100 ft). Its flowers, petioles, twigs, and seeds are all red to varying degrees. Among these features, however, it is best known for its brilliant deep scarlet foliage in autumn.  <br><br> <a href="https://www.inaturalist.org/photos/108670006" rel="noreferrer"> Image by Stephen Seiberling</a> <br><br><a href="https://en.wikipedia.org/wiki/Acer_rubrum" rel="noreferrer">Read More</a></td>
        </tr>
        <!-- Add more flora rows as needed -->
      </tbody>
    `;
    button.innerHTML = "Switch to Fauna";
  } else {
    // Switch to displaying Fauna data and update the button label
    table.innerHTML = `
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      <!-- Fauna Data -->
      <tr>
        <td><img src="../../resources/image/fauna/songSparrow.jpg" alt="Song Sparrow (Melospiza melodia)"></td>
        <td>Song Sparrow (Melospiza melodia)</td>
        <td>The song sparrow (Melospiza melodia) is a medium-sized New World sparrow. Among the native sparrows in North America, it is easily one of the most abundant, variable and adaptable species. Adult song sparrows have brown upperparts with dark streaks on the back and are white underneath with dark streaking and a dark brown spot in the middle of the breast. They have a brown cap and a long brown rounded tail. Their face is gray with a brown streak through each eye.<br><br><a href="http://commons.wikimedia.org/wiki/File:Melospiza_melodia_JRVdH_01.jpg" rel="noreferrer">Image by Cephas</a> <br><br> <a href="https://en.wikipedia.org/wiki/Song_sparrow" rel="noreferrer">Read More</a></td>
      </tr>
      <tr>
        <td><img src="../../resources/image/fauna/redSquirrel.jpeg" alt="American red squirrel (Tamiasciurus hudsonicus)"></td>
        <td>American red squirrel (Tamiasciurus hudsonicus)</td>
        <td>The American red squirrel (Tamiasciurus hudsonicus) is one of three species of tree squirrels currently classified in the genus Tamiasciurus, known as the pine squirrels (the others are the Douglas squirrel, T. douglasii, and the southwestern red squirrel, T. fremonti). The American red squirrel is variously known as the pine squirrel or piney squirrel, North American red squirrel, chickaree, boomer, or simply red squirrel. <br><br><a href="https://www.inaturalist.org/observations/106185117">Image by Craig K. Hunt</a> <br><br> <a href="https://en.wikipedia.org/wiki/American_red_squirrel" rel="noreferrer">Read More</a></td>
      </tr>
      <tr>
        <td><img src="../../resources/image/fauna/asianLadyBeetle.jpg" alt="Asian Lady Beetle (Harmonia axyridis)"></td>
        <td>Asian Lady Beetle (Harmonia axyridis)</td>
        <td>Harmonia axyridis is a large lady beetle or ladybug species that is most commonly known as the harlequin, Asian, or multicoloured asian lady beetle. This is one of the most variable species in the world, with an exceptionally wide range of colour forms. It is native to eastern Asia, but has been artificially introduced to North America and Europe to control aphids and scale insects. It is now common, well known, and spreading in those regions, and has also established in Africa and widely across South America. This species is conspicuous in North America, where it may locally be known as the Halloween beetle, as it often invades homes during October to overwinter.<br><br><a href="https://www.inaturalist.org/photos/30978499">Image by Paolo Mazzei</a> <br><br> <a href="https://en.wikipedia.org/wiki/American_red_squirrel" rel="noreferrer">Read More</a></td>
      </tr>
      <tr>
        <td><img src="../../resources/image/fauna/commonPeriwinkle.jpg" alt="Common Periwinkle (Littorina littorea)"></td>
        <td>Common Periwinkle (Littorina littorea)</td>
        <td>The common periwinkle or winkle (Littorina littorea) is a species of small edible whelk or sea snail, a marine gastropod mollusc that has gills and an operculum, and is classified within the family Littorinidae, the periwinkles. This is a robust intertidal species with a dark and sometimes banded shell. It is native to the rocky shores of the northeastern, and introduced to the northwestern, Atlantic Ocean. <br><br><a href="https://www.inaturalist.org/photos/3505851">Image by Robin Gwen Agarwal</a> <br><br> <a href="https://en.wikipedia.org/wiki/Common_periwinkle" rel="noreferrer">Read More</a></td>
      </tr>
      <tr>
        <td><img src="../../resources/image/fauna/rockPigeon.jpg" alt="Rock Pigeon (Columba livia)"></td>
        <td>Rock Pigeon (Columba livia)</td>
        <td>The rock dove, rock pigeon, or common pigeon is a member of the bird family Columbidae. In common usage, it is often simply referred to as the "pigeon". Wild rock doves are pale grey with two black bars on each wing, whereas domestic and feral pigeons vary in colour and pattern. Few differences are seen between males and females. The species is generally monogamous, with two squabs (young) per brood. Both parents care for the young for a time.<br><br><a href="https://www.inaturalist.org/photos/96934693">Image by Константин Самодуров</a> <br><br> <a href="https://en.wikipedia.org/wiki/Rock_dove" rel="noreferrer">Read More</a></td>
      </tr>
        <!-- Add more animal rows as needed -->
      </tbody>
    `;
    button.innerHTML = "Switch to Flora";
  }
}

/**
 * Search and filter a table based on user input, specifically targeting the 'Name' column.
 * The function retrieves the search input, filters the table rows based on the input,
 * and updates the display of rows accordingly.
 * 
 * @function searchTable
 * @memberof window
 * @global
 */
function searchTable() {
  // Get references to input, filter, table, and table rows
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("animalTable");
  tr = table.getElementsByTagName("tr");

  // Iterate through each table row and check the 'Name' column for a match with the input
  for (i = 0; i < tr.length; i++) {
    // Index 1 corresponds to the 'Name' column
    td = tr[i].getElementsByTagName("td")[1];

    if (td) {
      // Get the text content of the 'Name' column
      txtValue = td.textContent || td.innerText;

      // Check if the text content includes the filter text (case-insensitive)
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ""; // Display the row if there is a match
      } else {
        tr[i].style.display = "none"; // Hide the row if there is no match
      }
    }
  }
}
