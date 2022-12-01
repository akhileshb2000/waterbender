from pymongo import MongoClient
  
try:
    conn = MongoClient("mongodb+srv://waterbender:waterbender@cluster0.leahp9h.mongodb.net/?retryWrites=true&w=majority")
    print("Connected successfully!!!")
except:  
    print("Could not connect to MongoDB")
  
# database name: mydatabase
db = conn.Waterbender
  
# Created or Switched to collection names: myTable
collection = db.Drawings
  
# To find() all the entries inside collection name 'myTable'
cursor = collection.find()
for record in cursor:
    print(record)