Angular Draggable Markers
==================================================

This directive will make any element with the attribute `draggable` draggable.
The draggable elements need to have their position set to absolute using css
and the parent need to have its position set to relative or absolute.
The position is allways a percentage of the height and width of the parent elements.
If `draggable-model` is set the model will be updated with the x and y position (0-100 float) of the element when dragged.
Same goes for the element when the model is changed.

Example Usage
--------------------------------------

```HTML
<div class="map-wrapper">
    <img src="/images/map.jpg" alt="">
    <div ng-repeat="m in marker" draggable="true" draggable-model="m" class="marker">
        <span class="marker-name">{{m.name}}</span>
    </div>
</div>
```

```CSS
.map-wrapper{
    position: relative;
}
.map-wrapper img{
    display: block;
    width: 100%;
    height: auto; 
}
.marker{
    position: absolute;
    top: 50%;
    left: 50%;
}
```
