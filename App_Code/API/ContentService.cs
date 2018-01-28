using System;
using System.IO;
using System.Diagnostics;
using System.Web;
using System.Text;

public class ContentService : IContentService
{
	public ContentService()
	{
		// set no-cache
		HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
	}

	public string ConvertContent(Content obj)
	{
		if (String.IsNullOrEmpty(obj.htmlContent) &&
			String.IsNullOrEmpty(obj.wikiContent)) return "";

		string rawInput = "",
			fromFormat = "",
			toFormat = "";

		if (!String.IsNullOrEmpty(obj.htmlContent)) {
			rawInput = obj.htmlContent;
			fromFormat = "html";
			toFormat = "mediawiki";
		} else {
			rawInput = obj.wikiContent;
			fromFormat = "mediawiki";
			toFormat = "html";
		}

		string fileName = String.Format("{0}.txt", Guid.NewGuid().ToString());
		string filePath = HttpContext.Current.Server.MapPath(String.Format("~/temp/{0}", fileName));
		string[] input = rawInput.Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

		File.WriteAllLines(filePath, input);

		Process cmd = new Process();

		cmd.StartInfo.WorkingDirectory = HttpContext.Current.Server.MapPath("~/Bin");
		cmd.StartInfo.FileName = "cmd.exe";
		cmd.StartInfo.Arguments = String.Format("/c pandoc -f {0} -t {1} ../temp/{2}", fromFormat, toFormat, fileName);
		cmd.StartInfo.CreateNoWindow = true;
		cmd.StartInfo.UseShellExecute = false;
		cmd.StartInfo.RedirectStandardInput = true;
		cmd.StartInfo.RedirectStandardOutput = true;
		cmd.StartInfo.RedirectStandardError = true;

		cmd.Start();
		StreamReader reader = new StreamReader(cmd.StandardOutput.BaseStream, Encoding.UTF8);
		string output = reader.ReadToEnd();
		reader.Close();
		cmd.Close();

		File.Delete(filePath);

		return output;
	}
}

