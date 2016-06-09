# Test Page Component Horizontal Flicking

page = new PageComponent width:Framer.Device.screen.width, height:Framer.Device.screen.height, backgroundColor:"#fff"
page.scrollVertical = false

for index in [0..30]
	pageContent = new Layer
		width:  page.width
		height: page.height
		x: index * (page.width + 4)
		backgroundColor: Utils.randomColor(.5)
		superLayer: page.content

	pageContent.html = "#{index}"
	pageContent.style = {
		"font-size" : "100px"
		"font-weight" : "100"
		"text-align" : "center"
		"line-height" : "#{Framer.Device.screen.height}px"
		}

# page.velocityMultiplier = 50

page.on Events.Move, (point) ->
	print "MOVE", Date.now(), point