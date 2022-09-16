using BlazorWeb;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Radzen;
using Blazor.SubtleCrypto;
using FileDownloader;
using MatBlazor;

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
        builder.Services.AddScoped<DialogService>();
        builder.Services.AddScoped<NotificationService>();
        builder.Services.AddScoped<TooltipService>();
        builder.Services.AddScoped<ContextMenuService>();
        await builder.Build().RunAsync();
    }
}