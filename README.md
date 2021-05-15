# Field of Dreams

## Description
Field of Dreams is a website that allows users to plant flowers on a field shared by all users of the website. Users can create flowers in the flower creator which uses a rendering engine that takes in a set of attributes users can set which dictate how the flowers are generated. Through this technique users can customize the shape of petals, color of the stem, the length of the stem and more in order to generate a wide range of flowers.

## Installation
### To install codebase on local machine: 
- Go to the [Field-of-Dreams GitHub Repository](https://github.com/Gpphelps/field-of-dreams)
- Click **Code** and clone repository in gitbash/terminal using command: 
```sh
git clone [https or ssh]
```
- Initialize the application by navigating to the project folder on your local machine and running the command: 
```sh
npm start && npm run seed
```
- Once the server is listening, you can access application and all functionality

### To access deployed application on Heroku:
- Go to [Fields-of-Dreams Heroku Application](https://dashboard.heroku.com/apps/fields-of-dreams)
- Click **Open App**
- Access application and all functionality

## Usage 
To use application

## Features

This application uses user selected attributes to generate unique flowers. Below is an Attribute Reference that details each attribute and its definition.

### *Max Curve*
Max curve dictates the maximum amount of curve (which is the amount a flower will bend to one side) a flower will have and every flower generated from those attributes will have a curve that is a random amount between 0 and the maximum.

### *Max Variation*
Decides the maximum amount any stem segment's growth vector will vary from the current growth vector and picks a random amount between 0 and the maximum. Higher max variations will cause more irregularity in the stem's shape

### *Stem Width*
Thickness of the stem.

### *Bulb Radius*
Size of the flower's bulb.

### *Bulb Color*
Red, Green and Blue values of the color of the flower's bulb.

### *Stem Color*
Red, Green and Blue values of the color of the flower's stem.

### *Petal Color*
The maximum amount that will be added or subttracted from the red, green and blue values of the color of each petal. A single value is randomly picked between 0 and the selected petal color variation and is added or subtracted the same amount from the petal's red, green and blue values.

### *Segments*
The number of segments that the flower's stem will extend to. Higher segment values will lead to taller flowers.

### *Segment Variation*
The maximum amount that the number of segments will vary from flower to flower. Higher values will cause a wider range of flower heights from the same set of flower attributes.

### *Petal Number*
The number of petals the flower will have.

### *Petal Shape*
A set of points which make up the shape of the petal which is rotated around the bulb for every petal.

### *Petal Scale*
Amount that the size of the petals are multiplied by. Higher petal scales will lead to larger petals.

### *Petal Scale Variation*
The maximum amount that the size of the petals will vary from the norm. For every petal a random value between 0 and the petal scale variation is chosen seperatley for the width and height of the petal. Higher values will cause more variation in the size of the petals and more difference on average between the width and height of the petal leading to more irregular petal shapes.

## Credits


