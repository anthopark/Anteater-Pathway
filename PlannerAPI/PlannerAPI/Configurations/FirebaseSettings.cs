using System.Text.Json;
using System.Text.Json.Serialization;

namespace PlannerAPI.Configurations;

public class FirebaseSettings
{
    private class ServiceAccountCredential
    {
        [JsonPropertyName("type")] public string Type { get; set; }
        [JsonPropertyName("project_id")] public string ProjectId { get; set; }
        [JsonPropertyName("private_key_id")] public string PrivateKeyId { get; set; }
        [JsonPropertyName("private_key")] public string PrivateKey { get; set; }
        [JsonPropertyName("client_email")] public string ClientEmail { get; set; }
        [JsonPropertyName("client_id")] public string ClientId { get; set; }
        [JsonPropertyName("auth_uri")] public string AuthUri { get; set; }
        [JsonPropertyName("token_uri")] public string TokenUri { get; set; }

        [JsonPropertyName("auth_provider_x509_cert_url")]
        public string AuthProviderX509CertUrl { get; set; }

        [JsonPropertyName("client_x509_cert_url")]
        public string ClientX509CertUrl { get; set; }
        
    }

    private ServiceAccountCredential _serviceAccountCredential;

    public void LoadCredentialConfigurations(IConfiguration config)
    {
        _serviceAccountCredential = new ServiceAccountCredential()
        {
            Type = config["FirebaseServiceAccount:Type"],
            ProjectId = config["FirebaseServiceAccount:ProjectId"],
            PrivateKeyId = config["FirebaseServiceAccount:PrivateKeyId"],
            PrivateKey = config["FirebaseServiceAccount:PrivateKey"],
            ClientEmail = config["FirebaseServiceAccount:ClientEmail"],
            ClientId = config["FirebaseServiceAccount:ClientId"],
            AuthUri = config["FirebaseServiceAccount:AuthUri"],
            TokenUri = config["FirebaseServiceAccount:TokenUri"],
            AuthProviderX509CertUrl = config["FirebaseServiceAccount:AuthProviderX509CertUrl"],
            ClientX509CertUrl = config["FirebaseServiceAccount:ClientX509CertUrl"]
        };
    }
    

    public string GetCredentialInJsonText()
    {
        if (_serviceAccountCredential == null)
        {
            throw new Exception("Firebase Service Account Credential has not loaded.");
        }

        return JsonSerializer.Serialize(_serviceAccountCredential);
    }
}