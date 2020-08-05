#!/bin/sh

tmux new -d -s App
tmux split-window -t App
tmux split-window -h -t App
tmux split-window -t App
tmux select-layout tiled


# tmux send-keys -t  App:0.1 "cd ~/Projects/app-name" ENTER
# tmux send-keys -t  App:0.1 "sudo caddy run" ENTER

tmux send-keys -t  App:0.3 "cd ~/Projects/app-name" ENTER
tmux send-keys -t  App:0.3 "docker-compose up" ENTER

tmux send-keys -t  App:0.0 "cd ~/Projects/app-name/api" ENTER
# Don't start server? Use vscode terminal because of debugging
tmux send-keys -t  App:0.0 "yarn dev" ENTER

tmux send-keys -t  App:0.2 "cd ~/Projects/app-name/web" ENTER
tmux send-keys -t  App:0.2 "yarn dev" ENTER

tmux attach -t App

