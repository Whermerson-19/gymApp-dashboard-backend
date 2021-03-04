import handlebars from "handlebars";
import fs from "fs";

interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export default class MailTemplateProvider {
  public async parse({ file, variables }: IParseMailTemplate) {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
