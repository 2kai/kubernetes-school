import java.io.*;
import java.net.*;

class DummySite {
    public static void main(String args[]) {
        System.out.println("Downloading website " + args[0]);

        String pageContent = getContent(args[0]);

        try {
            FileWriter myWriter = new FileWriter("/usr/src/app/index.html");
            myWriter.write(pageContent);
            myWriter.close();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    private static String getContent(String websiteUrl) {
        StringBuilder content = new StringBuilder();

        try {
            URL url = new URL(websiteUrl);
            URLConnection urlConnection = url.openConnection();

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                content.append(line + "\n");
            }
            bufferedReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return content.toString();
    }
}
