using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TripMaker.Startup))]
namespace TripMaker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
