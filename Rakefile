VERSION_NUMBER = "0.0.1"
wdgt_bin = "Seismometer.wdgt"
xcode_proj = "plugin/UnimotionPlugin/UnimotionPlugin.xcodeproj/"

task :default => [:build]

task :build => [:build_plugin, :build_wdgt, :install_wdgt] do end

task :build_plugin => [:clean_plugin] do
	sh "xcodebuild -project #{xcode_proj}"
end

task :clean_plugin do 
	sh "rm -rdf plugin/UnimotionPlugin/build"
end

task :build_wdgt => [:clean_wdgt] do
	sh "mkdir -p #{wdgt_bin}/UnimotionPlugin.bundle"
	sh "cp -r example_widget/* #{wdgt_bin}"
	sh "cp -r plugin/UnimotionPlugin/build/Release/UnimotionPlugin.bundle/*  #{wdgt_bin}/UnimotionPlugin.bundle"
	sh "rm  #{wdgt_bin}/design.psd"
end

task :clean_wdgt do
	sh "rm -rdf #{wdgt_bin}"
end

task :install_wdgt do
	sh "open #{wdgt_bin}"
end

task :restart_dock do
	sh "killall Dock"
end

task :generate_site do

  sh 'rm -rdf gh_pages/*'
  sh 'cp -R site_templates/* gh-pages/'

  require 'rubygems'
  require 'rdoc/markup/to_html'

  def get_file_as_string(filename)
    data = ''
    f = File.open(File.expand_path(filename), "r") 
    f.each_line do |line|
      data += line
    end
    return data
  end

  def string_replace(search, replace, filename)
    file = File.open(File.expand_path(filename), "r")
    aString = file.read
    file.close
    aString.gsub!(search, replace)
    File.open(filename, "w") {|file| file << aString}
  end
  
  h = RDoc::Markup::ToHtml.new
  html_str = h.convert(get_file_as_string('README.rdoc'))
  
  string_replace('GENERATED_CONTENT', html_str, 'gh-pages/index.html')
    
end

task :package_bundle do
  sh "mkdir UnimotionPlugin.bundle"
  sh "cp -R plugin/UnimotionPlugin/build/Release/UnimotionPlugin.bundle/* UnimotionPlugin.bundle"
  sh "tar -czvf UnimotionPlugin.bundle.#{VERSION_NUMBER}.tgz UnimotionPlugin.bundle/*"
  sh "rm -rdf UnimotionPlugin.bundle"
end

