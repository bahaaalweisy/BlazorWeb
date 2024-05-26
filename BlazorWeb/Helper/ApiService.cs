using System.Net.Http.Headers;

namespace BlazorWeb.Helper
{
    public class ApiService
    {
        private HttpClient _client;
        private string _accessToken;

        public ApiService(string accessToken)
        {
            _accessToken = accessToken;

            var handler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            _client = new HttpClient(handler);

            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
            _client.DefaultRequestHeaders.Accept.Clear();

            _client.DefaultRequestHeaders.Add("version", "1.0");
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public async Task<string> GetApiResponseAsync(string url)
        {
            var response = await _client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }

            throw new HttpRequestException($"Response status code does not indicate success: {(int)response.StatusCode} ({response.StatusCode}).");
        }


        public async Task<string> PostApiResponseAsync(string url, HttpContent content)
        {
            HttpResponseMessage response = await _client.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception(errorContent);
            }
        }

     
        public async Task<string> GetByIdAsync(string url)
        {
            var response = await _client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }

            throw new HttpRequestException($"Response status code does not indicate success: {(int)response.StatusCode} ({response.StatusCode}).");
        }

        public async Task<string> PutApiResponseAsync(string url, HttpContent content)
        {
            var response = await _client.PutAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }

            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception(errorContent);
        }

        public async Task<string> DeleteApiResponseAsync(string url)
        {
            var response = await _client.DeleteAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }

            throw new HttpRequestException($"Response status code does not indicate success: {(int)response.StatusCode} ({response.StatusCode}).");
        }
    }

}
