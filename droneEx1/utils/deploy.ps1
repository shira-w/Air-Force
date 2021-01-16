param(
    [string]$fireBaseToken,
    [string]$fireBaseProject,
    [string]$releaseMessage
)
$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

npm i -g firebase-tools
write-host "starting deploy...";
firebase --version;
write-host "command is: firebase deploy --token $fireBaseToken --project $fireBaseProject"
firebase deploy --token $fireBaseToken --project $fireBaseProject --message "Release: $releaseMessage";
write-host "deployment completed";

Pop-Location
