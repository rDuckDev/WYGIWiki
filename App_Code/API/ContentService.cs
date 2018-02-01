﻿using System;
using System.IO;
using System.Diagnostics;
using System.Web;
using System.Text;
using System.Text.RegularExpressions;

public class ContentService : IContentService
{
	public ContentService()
	{
		// set no-cache
		HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
	}

	public string ConvertContent(Content obj)
	{
		if (String.IsNullOrEmpty(obj.htmlContent)) return "";

		string fileName = String.Format("{0}.txt", Guid.NewGuid().ToString());
		string fileDirectory = HttpContext.Current.Server.MapPath("~/temp");
		string filePath = String.Concat(fileDirectory, "\\", fileName);
		string[] input = obj.htmlContent.Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

		if (!Directory.Exists(fileDirectory)) Directory.CreateDirectory(fileDirectory);

		File.WriteAllLines(filePath, input);

		Process cmd = new Process();

		cmd.StartInfo.WorkingDirectory = HttpContext.Current.Server.MapPath("~/Bin");
		cmd.StartInfo.FileName = "cmd.exe";
		cmd.StartInfo.Arguments = String.Format("/c pandoc -f html -t mediawiki ../temp/{0}", fileName);
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

		output = output.Replace("{|", "{| class=\"wikitable\"");
		output = new Regex("(width=.{0,12}[|] )").Replace(output, " ");

		File.Delete(filePath);

		return output;
	}
}

