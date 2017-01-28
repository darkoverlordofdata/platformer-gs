#!/usr/bin/env bash

#
#   Set up project package with 'npm run entitas'' command
#
if [ ! -f ./package.json ]; then
    npm init -y
    sed -i "s/\"test\": \"echo \\\\\"Error: no test specified\\\\\" \&\& exit 1\"/\"entitas\": \"entitas\"/" package.json
fi
#
#   install local entitas-cli
#
if [ "" == "`npm list entitas-cli | grep 'entitas-cli'`" ]; then
    npm install entitas-cli --save-dev
fi
#
#   initialize entitas
#
if [ ! -f ./entitas.json ]; then
    npm run entitas -- init platformer -t bin
fi


#
# create the schema & generate components
#
npm run entitas -- create -c Bounds radius:double
npm run entitas -- create -c Destroy
npm run entitas -- create -c Layer ordinal:int
npm run entitas -- create -c Player
npm run entitas -- create -c Position x:double y:double
npm run entitas -- create -c Resource path:string sprite:Object? bgd:bool
npm run entitas -- create -c Score value:double
npm run entitas -- create -c Text text:string sprite:Object?
npm run entitas -- create -c Velocity x:double y:double
npm run entitas -- create -s PhysicsSystem ISetWorld IExecuteSystem
npm run entitas -- create -s PlayerInputSystem ISetWorld IExecuteSystem IInitializeSystem
npm run entitas -- create -s RenderPositionSystem ISetWorld IExecuteSystem
npm run entitas -- create -s ViewManagerSystem ISetWorld IExecuteSystem
npm run entitas -- generate -p gs -t src