# Install vscode-proto3

- Install extensions **vscode-proto3** and **Clang-Format** in **Visual Studio Code**

- Install Protobuf

- Follow the video [Install Clang on Windows 10 with MSYS2 MinGW-w64](https://www.youtube.com/watch?v=uyDBoogrHww)

- Use `where clang-format` to find the absolute path of `clang-format.exe`

- Add settings in `settings.json` in vscode

    ```json
    "protoc": {
        "path": "D:\\protoc-3.4.0-win32\\bin\\protoc.exe",
    },
    "[proto3]": {
        "editor.defaultFormatter": "xaver.clang-format"
    },
    "files.associations": {
        "*.config": "proto3"
    },
    "editor.formatOnSave": true,
    "clang-format.executable": "C:\\msys64\\mingw64\\bin\\clang-format.exe"
    ```