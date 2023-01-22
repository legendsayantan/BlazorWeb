filename='sitemap.xml'
page= echo "$1" | cut -d '/' -f 2
curDate=$(date +'%Y-%m-%d')
if [ -f "$filename" ] ; then
    rm "$filename"
fi
IFS=$'\n' read -r -d '' -a allPaths < <( jq '.[] | .path' -r data/projects.json && printf '\0' )
echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >>$filename
for str in ${allPaths[@]}; do
  echo "<url><loc>https://${page}${str}</loc><lastmod>${curDate}</lastmod></url>" >> $filename
done
echo '</urlset>' >> $filename