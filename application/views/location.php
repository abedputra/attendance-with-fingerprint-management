
<h3>Setup Your Office</h3>
<hr>
<div id="map-canvas" style="border: 2px solid rgb(83, 188, 157);"></div>
<textarea id="info" style="display: none;"></textarea>

<button id="saveLocation" class="btn btn-primary" style="margin-top: 20px;margin-bottom: 20px">Save Area</button>

<h4>Note</h4>
<hr>
- To create an area or reset Poly please click the Poly icon.<br>
- You can drag and drop after create Poly.<br>
- After the drawing area please click "Save Area" to save the coordinate area.<br>
- To add Google API, please insert it on application/views/footer, and then add key after &key -> https://maps.googleapis.com/maps/api/js?sensor=false&libraries=geometry,drawing&ext=.js&key=(Add the API here).