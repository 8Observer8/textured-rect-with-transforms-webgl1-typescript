import MyScene from "./MyScene";

class Program
{
    public static Main(): void
    {
        let scene = new MyScene("renderCanvas");
    }
}

// Debug Version
Program.Main();

// Release Version
// window.onload = () => Program.Main();
