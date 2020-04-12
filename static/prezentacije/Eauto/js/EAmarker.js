function EAmarker(options)
{
	this.setValues(options);

	var span = this.span_ = document.createElement('span');
	span.style.cssText
		= 'position: relative; left: -50%; top: -8px; '
		+ 'white-space: nowrap; '
		+ 'padding: 2px; background-color: #fff';

	var div = this.div_ = document.createElement('div');
	div.appendChild(span);
	div.style.cssText = 'position: absolute; display: none';
};

EAmarker.prototype = new google.maps.OverlayView;

EAmarker.prototype.onAdd = function()
{
	var pane = this.getPanes().overlayLayer;
	pane.appendChild(this.div_);

	var me = this;
	this.listeners_ = [
		google.maps.event.addListener(this, 'position_changed',
			function() { me.draw(); }),
		google.maps.event.addListener(this, 'text_changed',
			function() { me.draw(); })
	];
};

EAmarker.prototype.onRemove = function()
{
	this.div_.parentNode.removeChild(this.div_);

	// Marker is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners_[i]);
	}
};

EAmarker.prototype.draw = function()
{
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	div.style.display = 'block';

	this.span_.innerHTML = this.get('text').toString();
};
