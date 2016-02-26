require 'json'

class WebifyJson
  def self.webify(input,namespace,object_name,output)
    json = "window.#{namespace}.#{object_name}="
    json_file = File.new(input,'r')
    output_file = File.new(output,'w')

    while(line = json_file.gets)
        json += line
    end

    json += ";"

    output_file.write(json)

    output_file.close
  end
end

WebifyJson.webify(ARGV[0],ARGV[1],ARGV[2],ARGV[3])