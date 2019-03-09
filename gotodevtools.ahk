#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;fileParam := "jquery.js"
;lineParam := 11
;breakPointParam := "true"

fileParam := A_Args[1] 
lineParam := A_Args[2] 
breakPointParam := A_Args[3] 

If breakPointParam == "false"
{
    breakPointParam  := false
}


; WinRestore 
WinActivate, ahk_exe chrome.exe

Sleep, 100
CoordMode, Pixel, Window
ImageSearch, FoundX, FoundY, 0, 0, 2560, 1080, assets\0.png
If ErrorLevel != 0 
{
	Send, ^+i   
	Sleep, 1000
}

ImageSearch, FoundX, FoundY, 0, 0, 2560, 1080, assets\2.png
If !ErrorLevel 
{
    Click, %FoundX%, %FoundY% Left, 1
}
Else
{
    ImageSearch, FoundX, FoundY, 0, 0, 2560, 1080, assets\2.png
    If !ErrorLevel
    {
        Click, %FoundX%, %FoundY% Left, 1
    }
  
}

ImageSearch, FoundX, FoundY, 0, 0, 2560, 1080, assets\1.png
If !ErrorLevel 
{
    Click, %FoundX%, %FoundY% Left, 1
}
Else
{
    ImageSearch, FoundX, FoundY, 0, 0, 2560, 1080, assets\1.png
    If !ErrorLevel
    {
        Click, %FoundX%, %FoundY% Left, 1
    }
    Else
    {
       ExitApp
    }
}

Open(fileParam, lineParam, breakPointParam)

Open(file, line, breakPoint) {
    Send, ^p
    Sleep, 10
    SendRaw, 
    (LTrim
      %file%
     )
    Sleep, 500
    Send, {Enter} 
    Send, ^g
    Sleep, 60
    SendRaw, %line%
    Send, {Enter} 
    
    If breakPoint != false 
    {
        Send, ^b
    }
}
