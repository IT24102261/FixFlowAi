using FixFlow.Application.DTOs.Maps;

namespace FixFlow.Application.Interfaces;

public interface IMapService
{
    Task<GeocodeResult> GeocodeAddressAsync(string address, CancellationToken cancellationToken = default);
    Task<ReverseGeocodeResult> ReverseGeocodeAsync(double latitude, double longitude, CancellationToken cancellationToken = default);
    Task<DistanceResult> CalculateApproximateDistanceAsync(MapPoint origin, MapPoint destination, CancellationToken cancellationToken = default);
<<<<<<< HEAD
}
=======
}
>>>>>>> aced347 (after final corrections from all members)
