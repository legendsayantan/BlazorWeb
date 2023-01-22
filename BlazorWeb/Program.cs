using Blazor.SubtleCrypto;
using BlazorWeb;
using FileDownloader;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;

internal class Program
{
    static WebAssemblyHostBuilder builder;
    private static async Task Main(string[] args)
    {
        builder = WebAssemblyHostBuilder.CreateDefault(args);
        builder.RootComponents.Add<App>("#app");
        builder.RootComponents.Add<HeadOutlet>("head::after");
        builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
        builder.Services.AddFileDownloder();
        builder.Services.AddSubtleCrypto(opt => opt.Key = "samplexcryptdemo");
        await builder.Build().RunAsync();
    }

}
public interface IClipboardService
{
    Task CopyToClipboard(string text);
}
public class ClipboardService : IClipboardService
{
    private readonly IJSRuntime _jsInterop;

    public ClipboardService(IJSRuntime jsInterop)
    {
        _jsInterop = jsInterop;
    }

    public async Task CopyToClipboard(string text)
    {
        await _jsInterop.InvokeVoidAsync("navigator.clipboard.writeText", text);
    }
}
