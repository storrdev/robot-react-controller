# React Robot Controller

A React application for controlling a robot using websockets.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need node.js installed on your development machine. I'm currently using node v10.x.x while developing this.

A websocket server ready to recieve commands for your robot. If you are using a raspberry pi (like me) you might be interested in something like [python-websocket-server](https://github.com/Pithikos/python-websocket-server), which you can install into a python project using the following command:

```
pip install git+https://github.com/Pithikos/python-websocket-server
```

### Installing

A step by step series of examples that tell you how to get a development env running

First you will need to get the repository onto your machine by either downloading the zip or cloning.

```
git clone https://github.com/storrdev/robot-react-controller
```

Once you have the repository on your machine, open the directory that was created

```
cd react-robot-controller
```

Then install all the dependencies

```
npm install
```

And finally start the development server

```
npm start
```


Once the development server is up and running, you should be able to see the react application running at [http://localhost:3000](http://localhost:3000)


## Deployment

To build the package of the react application for hosting somewhere like github pages or amazon s3 just run the following command from the project root:

```
npm run build
```

## Built With

* [Create React App](https://github.com/facebook/create-react-app) - The web framework used

## Contributing

Please read submit a pull request with a detailed description of your changes and the reason behind them.

## Authors

* **Stephen Orr** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
