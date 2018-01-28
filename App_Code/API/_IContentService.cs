using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IContentService
{
	[OperationContract]
	[WebInvoke (Method = "*")]
	string ConvertContent(Content obj);
}

[DataContract]
public class Content
{
	[DataMember]
	public string htmlContent { get; set; }
	[DataMember]
	public string wikiContent { get; set; }
}
