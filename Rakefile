wdgt_bin = "UnimotionExampleWidget.wdgt"
xcode_proj = "plugin/UnimotionPlugin/UnimotionPlugin.xcodeproj/"


task :default => [:build]

task :build => [:build_plugin, :build_wdgt] do

end

task :build_plugin => [:clean_plugin] do
	sh "xcodebuild -project #{xcode_proj}"
end

task :clean_plugin do 
	sh "rm -rdf plugin/UnimotionPlugin/build"
end

task :build_wdgt => [:build_plugin, :clean_wdgt] do
	sh "mkdir -p #{wdgt_bin}/UnimotionPlugin.bundle"
	sh "cp -r example_widget/* #{wdgt_bin}"
	sh "cp -r plugin/UnimotionPlugin/build/Release/UnimotionPlugin.bundle/*  #{wdgt_bin}/UnimotionPlugin.bundle"
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
