function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 17953;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 17953 > /dev/null;
done;

for child in $(list_child_processes 17955);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/katarzyna/Downloads/Rozproszony-system-aukcyjny-REST-API-main/Rozproszony_System_Aukcyjny_REST_API/Rozproszony_System_Aukcyjny_REST_API.Server/bin/Debug/net10.0/34caf6f3c2af44e49822d86ac573d27b.sh;
