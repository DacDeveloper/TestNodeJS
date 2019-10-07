const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://DacNguyen1:DacNguyen1@cluster0-gns2a.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
const Express = require("express");
var app = Express();



var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.get("/person/:id", (request, response) => {
	client.connect(err => {
			if (err) {
				response.send({' Error occurred while connecting to MongoDB Atlas ': err });
				client.close();
				return;
			}
			console.log('Connected...');
			const collection = client.db("test").collection("devices");
			
			collection.findOne( { package: request.params.id }, function(err, result) {
			if (err) {
				response.send({' Error find ': err });
				
				client.close();
			} else {
				if (result==null) {
					collection.insertOne( { package: request.params.id } , function (err1, result1) {
						if (err1){
							response.send({' Error Insert ': err1 });
						}
						else
						response.send({'Insert ': 'success' });
						client.close();
					});
				}else{
					response.send({'Id Exited...': request.params.id });
					client.close();
				}
			}
			});

		
	});

    });
